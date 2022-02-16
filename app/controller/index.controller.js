const axios = require("axios");
require("dotenv").config();

exports.markConversation = (req, res) => {
  let config = {
    headers: {
      Authorization: `Bearer ${process.env.SECRET}`,
    },
  };

  const conversation_id = req.body.data.conversation.id;
  const conversation_url = `https://api.talkjs.com/v1/${process.env.APP_ID}/conversations/${conversation_id}`;
  let custom;

  const mark = (custom) => {
    try {
      axios
        .put(conversation_url, custom, config)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (req.body.data.sender.role === "admin") {
    custom = { custom: { answered: "true" } };
    mark(custom);
  } else if (req.body.data.sender.role === "default") {
    custom = { custom: { answered: "false" } };
    mark(custom);
  }
};

exports.keepServerAlive = (req, res) => {
  res.json("Server running...");
};
