import React from "react";
import { gql, useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";
const GET_Q = gql`
  subscription  {
    questions(order_by: { id: desc }) {
      id
      title
    }
  }
`;

const Questions = () => {
    const {loading, data} = useSubscription(GET_Q)
    if(loading) {
        return <div>Loading...</div>
    }
    console.log(data)
  return <div>
    {
        data.questions.map(question => {
            return (
                <div>
                    <Link to={`/${question.id}`}>{question.title}</Link>
                </div>
            )
        })
    }
  </div>;
};

export default Questions;
