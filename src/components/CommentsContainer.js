import React from "react";

const commentsData = [
  {
    name: "John Doe ",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "John Doe ",
    text: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [
      {
        name: "John Doe ",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [],
      },
      {
        name: "John Doe ",
        text: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [
          {
            name: "John Doe ",
            text: "Lorem ipsum dolor sit amet, consectetur adip",
            replies: [
              {
                name: "John Doe ",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
                replies: [
                  {
                    name: "John Doe ",
                    text: "Lorem ipsum dolor sit amet, consectetur adip",
                    replies: [
                      {
                        name: "John Doe ",
                        text: "Lorem ipsum dolor sit amet, consectetur adip",
                        replies: [],
                      },
                    ],
                  },
                  {
                    name: "John Doe ",
                    text: "Lorem ipsum dolor sit amet, consectetur adip",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;

  return (
    <div className="flex  p-2 rounded-lg  my-2">
      <h1>↪</h1>
      <img
        className="w-12 h-12"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div className="px-3">
        <p className="font-bold ">{name}</p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="  ml-8">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = ({ commentCount }) => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold ">Comments ({commentCount})</h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
