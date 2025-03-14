import { Request, Response } from 'express'
import prisma from '../config/prisma.js'

/**
 * @description - Retrieves all messages between the authenticated user and another user
 * @route - /:id
 * @method - GET
 * @access - Private
 */
export const getMessages = async (req: Request, res: Response): Promise<any> => {
  // Getting data from the request
  const { id: userToChatId } = req.params
  const senderId = req.user.id
  // Validating userToChatId
  if(userToChatId === senderId) {
    return res.status(400).json({
      success: false,
      message: "Cannot retrieve messages with yourself"
    })
  }
  // Attempting to retrieve messages
  try {
    // Checking user's existence
    const userExists = await prisma.user.findUnique({
      where: { id: userToChatId }
    })
    if(!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found or does not exist"
      })
    }
    // Finding the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId]
        }
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    })
    // Return an empty array if no conversation exists
    if(!conversation) {
      return res.status(200).json({
        success: true,
        message: "No messages in this conversation!",
        messages: []
      })
    }
    // Success response
    return res.status(200).json({
      success: true,
      messages: conversation.messages
    })
  } catch(error: any) {
    console.error(`Error retrieving user messages: ${error.message || error}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error while attempting to retrieve user messages",
      error: error.message || error
    })
  }
} // End of getMessages


/**
 * @description - Retrieves a list of all users except the authenticated user for the sidebar display
 * @route - /conversations-list
 * @method - GET
 * @access - Private
 */
export const getSidebarUsers = async (req: Request, res: Response): Promise<any> => {
  // Getting data from the request
  const authUserId = req.user.id
  // Attempting to retrieve the users list
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: authUserId }
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        profilePic: true
      },
      orderBy: {
        fullName: 'asc' // Sorting users alphabetically by name
      }
    })
    // Success response
    return res.status(200).json({
      success: true,
      users: users
    })
  } catch(error: any) {
    console.error(`Error in getting users list for sidebar: ${error.message || error}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error while attempting to retrieve users list for sidebar",
      error: error.message || error
    })
  }
} // End of getSidebarUsers


/**
 * @description - Handles sending messages between users. If no conversation exists, it creates one.
 * @route - /send/:id
 * @method - POST
 * @access - Private
*/
export const sendMessage = async (req: Request, res: Response): Promise<any> => {
  // Getting data from the request
  const { message } = req.body
  const { id: receiverId } = req.params
  const senderId = req.user.id
  // Message input validation
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Message cannot be empty"
    })
  }
  // If sending message to yourself 
  if(receiverId === senderId) {
    return res.status(400).json({
      success: false,
      message: "You cannot send a message to yourself!"
    })
  }
  // Attempting to send the message
  try {
    // Checking if receiver exists
    const receiverExists = await prisma.user.findUnique({
      where: { id: receiverId }
    })
    if(!receiverExists) {
      return res.status(404).json({ 
        success: false, 
        message: "Recipient not found or does not exist" 
      })
    }
    // Use a transaction for consistency across operations
    return await prisma.$transaction(async (tx)=> {
      // Finding existing conversation between two users
      let conversation = await tx.conversation.findFirst({
        where: {
          participantIds: {
            hasEvery: [senderId, receiverId]
          }
        }
      })
      // Var with no value to store the new message
      let newMessage;
      /* Validating conversation existence: it gets created
      if it's the first message between the two users */
      if(!conversation) {
        const newConversation = await tx.conversation.create({
          data: {
            participantIds: { set: [senderId, receiverId] },
            messages: {
              create: {
                senderId,
                body: message
              }
            }
          },
          include: { messages: true }
        })
        // Getting the first message that was created with the conversation
        newMessage = newConversation.messages[0]
      } else {
        // Creating new message for existing conversation
        newMessage = await tx.message.create({
          data: {
            senderId,
            body: message,
            conversationId: conversation.id
          }
        })
        // Updating conversation's updatedAt timestamp
        await tx.conversation.update({
          where: { id: conversation.id },
          data: { updatedAt: new Date() }
        })
      }
      
      /* Socket.io logic to be added here later */

      // Successful response with consistent structure
      return res.status(201).json({
        success: true,
        data: newMessage
      })
    }) // End of transaction return statement
  } catch(error: any) {
    console.error(`Error in sending message: ${error.message || error}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error while attempting to send message",
      error: error.message || error
    })
  }
} // End of sendMessage