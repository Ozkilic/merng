import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false)
      //remove post from cache
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: data.getPosts.filter((p) => p.id !== postId),
        },
      })

      if (callback) callback()
    },
    variables: {
      postId,
    },
  })

  return (
    <>
      <Button
        floated='right'
        icon
        color='red'
        onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export default DeleteButton
