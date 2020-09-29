//Import Schema (Model)
const Candidate = require("../model/candidate.model");
const Voters = require("../model/voters.model");
const Votes = require("../model/votes.model");
const stmp = require("emailjs");

//Retrieving Candidates Controller
exports.retrieveAllCandidates = (req, res) => {
  Candidate.find().then((data) => {
    Voters.find()
      .then((voters) => {
        res.status(200).json({ data, voters });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error fetching all candidates",
        });
      });
  });
};

//Adding Candidates Controller
exports.addCandidate = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.manifesto) {
    res.send({
      message: "All fields must be field",
    });
  }

  const Contestant = new Candidate({
    imageUrl: req.body.imageUrl,
    email: req.body.email,
    name: req.body.name,
    slug: req.body.slug,
    manifesto: req.body.manifesto,
    no_of_votes: 0,
  });

  const Voter = new Voters({
    email: req.body.email,
    votingCode: Math.floor(Math.random() * 200000) + 100000,
    hasVoted: false,
  });

  Contestant.save()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error, try again",
      });
    });
};

//Admin Controller Function
exports.addVoters = (req, res) => {
  if (!req.body.email) {
    res.send({
      message: "Please provide email",
    });
  }

  const voters = new Voters({
    email: req.body.email,
    votingCode: Math.floor(Math.random() * 200000) + 100000,
    hasVoted: false,
  });

  voters
    .save()
    .then((data) => {
      const client = new stmp.SMTPClient({
        user: "devsgnr-demos@outlook.com",
        password: "devSgnr_9",
        host: "smtp-mail.outlook.com",
        tls: {
          ciphers: "SSLv3",
        },
      });

      const message = new stmp.Message({
        text: `Your Demo Voting Code: ${data.votingCode}`,
        from: "エマニュエル <devsgnr-demos@outlook.com>",
        to: `${data.email}`,
        subject: "エマニュエル - Demo Voting :: Voting Code",
        attachment: [
          {
            data: `
            <p>Your Demo Voting Code: <i>${data.votingCode}</i></p> 
            <br/> 
            <p>Check out my <a href="https://devsgnr.xyz" target="_blank">website</a></strong></p>
            <br/><br/>
            <small style="color:grey;">&copy;${"2077"} Emmanuel Watila.</small>
            `,
            alternative: true,
          },
        ],
      });

      // send the message and get a callback with an error or details of the message that was sent
      client.send(message, function (err, message) {
        console.log(err || message);
      });
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong",
      });
    });
};

//Voting Controller
exports.vote = (req, res) => {
  if (!req.body.voterEmail || !req.body.votesId) {
    res.status(500).send({
      message: "All field most be filled",
    });
  }

  const vote = new Votes({
    voterEmail: req.body.voterEmail,
    votesId: req.body.votesId,
  });

  Candidate.updateMany(
    { _id: vote.votesId },
    { $inc: { no_of_votes: 1 } },
    { upsert: false }
  )
    .then((data) => {
      Voters.updateOne(
        { email: vote.voterEmail },
        { $set: { hasVoted: true } }
      ).then((voted) => {
        res.json({ data, voted });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "Something went wrong!" });
    });
};
