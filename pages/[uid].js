import React from 'react';

const UserId = (props) => {
  return <h1>{props.id}</h1>;
};

export default UserId;

export async function getServerSideProps(context) {
  const { params } = context;

  return {
    props: {
      id: params.uid,
    },
  };
}
