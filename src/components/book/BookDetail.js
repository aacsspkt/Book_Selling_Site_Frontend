import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

export default function BookDetail() {
	let { bookId } = useParams();
	return (
		<div>
			<p>{bookId}</p>
		</div>
	)
}

