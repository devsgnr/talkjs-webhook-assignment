const axios = require("axios");
require("dotenv").config();

exports.markConversationAsAnswered = (req, res) => {
  const conversation_id = req.body.data.conversation.id;

  let config = {
    headers: {
      Authorization: `Bearer ${process.env.SECRET}`,
    },
  };

  const conversation_url = `https://api.talkjs.com/v1/${process.env.APP_ID}/conversations/${conversation_id}`;

  if (req.body.data.sender.role === "default") {
    axios
      .put(
        conversation_url,
        {
          custom: { answered: "false" },
        },
        config
      )
      .then((res) => {
        console.log("done");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (req.body.data.sender.role === "admin") {
    axios
      .put(
        conversation_url,
        {
          custom: { answered: "true" },
        },
        config
      )
      .then((res) => {
        console.log("done");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

exports.keepServerAlive = (req, res) => {
  res.send("Server running...");
};
