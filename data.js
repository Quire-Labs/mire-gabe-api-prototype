module.exports = {
  buddyList: [
    {
      id: 1,
      name: "Francis Botters"
    },
    {
      id: 2,
      name: "Jennie Gregson"
    },
    {
      id: 3,
      name: "Caleb Easter"
    },
    {
      id: 4,
      name: "Gabriella Cams"
    },
    {
      id: 5,
      name: "Larry Winegarden"
    }
  ],

  messages: {
    1: [],
    2: [
      {
        sender: 1,
        message: "Hi I'm Olaf and I like warm hugs!"
      },
      {
        sender: 2,
        message: "I don't."
      },
      {
        sender: 1,
        message: "What's your opinion on socks?"
      },
      {
        sender: 1,
        message: "Just curious."
      },
      {
        sender: 2,
        message: "They are too wooly."
      }
    ],
    3: [
      {
        sender: 1,
        message: "Hi there."
      },
      {
        sender: 3,
        message: "Hello!"
      },
      {
        sender: 1,
        message: "I was thinking about politics..."
      },
      {
        sender: 1,
        message: "It's all pretty silly when you think about it."
      },
      {
        sender: 3,
        message: "I disagree."
      }
    ],
    4: [
      {
        sender: 4,
        message: "Never speak to me again."
      }
    ],
    5: [
      {
        sender: 5,
        message: "Hey! What's up??"
      },
      {
        sender: 1,
        message: "Nothing much, just talking to the mashed potatoes."
      },
      {
        sender: 5,
        message: "Cool... coooll..."
      }
    ]
  },

  posts: [
    {
      id: 1003,
      author: 1,
      tags: ["sports", "baseball"],
      message: "Here's some baseball statistics.",
      link: "http://www.espn.com/mlb/statistics",
      parentPost: null,
      comments: [
        {
          author: 2,
          message: "Cool! I'm stealing this."
        }
      ]
    },
    {
      id: 1004,
      author: 2,
      tags: ["sports", "baseball"],
      message: "Check out these cool statistics stuff!",
      link: null,
      parentPost: 1003,
      comments: [
        {
          author: 1,
          message: "Repost!"
        }
      ]
    },
    {
      id: 1005,
      author: 1,
      tags: ["random"],
      message: "I like to think about random stuff sometimes to bore you all.",
      link: null,
      parentPost: null,
      comments: []
    },
    {
      id: 1006,
      author: 4,
      tags: ["questions"],
      message: "What's your favorite color?",
      link: null,
      parentPost: null,
      comments: [
        {
          author: 1,
          message: "Blue for sure!"
        },
        {
          author: 3,
          message: "Red!"
        },
        {
          author: 5,
          message: "White and Gold."
        }
      ]
    },
    {
      id: 1007,
      author: 4,
      tags: ["music"],
      message: "I'm easy like Sunday morning.",
      link: "https://www.youtube.com/watch?v=7XcTyEKSnYg",
      parentPost: null,
      comments: []
    }
  ],

  news: [
    {
      topic: "sports",
      description: "Schibler Named Academic All-Ameican"
    },
    {
      topic: "sports",
      description: "Apple rolls out live sports integration to its TV app in Canada"
    },
    {
      topic: "cars",
      description: "This Corvette is a full-sized, radio-controlled car"
    },
    {
      topic: "cars",
      description: "How Porsche Became Hollywood's Golden Car"
    },
    {
      topic: "cars",
      description: "Drunk driver escapes after flipping car into pond"
    },
    {
      topic: "technology",
      description: "Trump announces 25 percent tariff on Chinese technology"
    },
    {
      topic: "music",
      description: "The Seismic Emotion of Mary Lattimore's Harp Music"
    },
    {
      topic: "music",
      description: "A comprehensive review of the Indians' entrance music"
    }
  ]
}
