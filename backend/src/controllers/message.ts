import { RequestHandler } from "express";
import conversation from "../models/conversation";
import messagemodle from "../models/message";

export const sendMessage: RequestHandler = async (req, res, next) => {
  try {
    const { id: recieverId }: any = req.params.id;
    const { message }: any = req.body;
    //@ts-ignore
    const senderId = req?.user?._id || "";

    let conversations = await conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!conversations) {
      conversations = await conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new messagemodle({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      //@ts-ignore
      conversations.messages.push(newMessage?._id);
    }
    //this is will run parralel
    await Promise.all([conversations.save(), newMessage.save()]);

    res.json({ message: "message success fully", success: true });
  } catch (error: any) {
    return res.json({
      message: error?.message || "something went wrong",
      success: false,
    });
  }
};

export const getMessages: RequestHandler = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    //@ts-ignore
    const senderId = req.user._id;

    const conversations = await conversation
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversations) return res.status(200).json([]);
    //@ts-ignore
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error: any) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
