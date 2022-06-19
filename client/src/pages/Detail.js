import { useParams } from "react-router-dom";
import { gql, useSubscription, useMutation } from "@apollo/client";
import { useState } from "react";
const GET_DETAIL = gql`
  subscription qDetail($id: Int!) {
    questions_by_pk(id: $id) {
      id
      title
      options {
        id
        title
        votes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

const VOTE = gql`
   mutation newVote($input: votes_insert_input!) {
    insert_votes_one(object: $input) {
      option {
        title
      }
    }
  }

`;

const Detail = () => {
  const [vote, setVote] = useState();
  const { id } = useParams();
  const { loading, data } = useSubscription(GET_DETAIL, {
    variables: { id: id },
  });
  const [addVote, {loading: loadingVote} ] = useMutation(VOTE)

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    questions_by_pk: { title, options },
  } = data;
  const handleVote = () => {
    addVote({
        variables: {
            input: {
                option_id: vote
            }
        }
    })
  };
  const total = options.reduce((acc, cur) =>  acc + cur.votes_aggregate.aggregate.count, 0)
  console.log(vote)
  return (
    <div>
      <h2>{title}</h2>
      {options.map((opt, i) => {
        return (
            <div key={i}>
          <label htmlFor={i}>
            <input
              type="radio"
              name="selected"
              value={opt.id}
              id={i}
              onChange={(e) => setVote(e.target.value)}
            />
            <b>{opt.title}</b>
          </label>
          <progress value={opt.votes_aggregate.aggregate.count} max={total}></progress>
        </div>
        );
      })}
      <button disabled={loadingVote} onClick={handleVote}>Vote</button>
    </div>
  );
};

export default Detail;
