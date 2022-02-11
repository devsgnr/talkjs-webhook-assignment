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

  if (req.body.data.sender.role === "default") {
    const custom = { custom: { answered: "false" } };

    try {
      axios
        .put(conversation_url, custom, config)
        .then((res) => {
          console.log(res);
          res.send("done");
        })
        .catch((error) => {
          console.log(error);
          res.send("done");
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (req.body.data.sender.role === "admin") {
    const custom = { custom: { answered: "true" } };
    try {
      axios
        .put(conversation_url, custom, config)
        .then((res) => {
          console.log(res);
          res.send("done");
        })
        .catch((error) => {
          console.log(error);
          res.send("done");
        });
    } catch (error) {
      console.error(error);
    }
  }
};

exports.keepServerAlive = (req, res) => {
  res.json("Server running...");
};
