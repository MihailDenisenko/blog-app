/* eslint-disable react/prop-types */
import React from 'react'
import Markdown from 'react-markdown';


export default function Discr({ description }) {
  return (
		<div>
			<Markdown>{description}</Markdown>
		</div>
	);
}
