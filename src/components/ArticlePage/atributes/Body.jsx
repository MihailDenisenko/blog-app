import React from 'react'
import Markdown from 'react-markdown'


export default function Body({text}) {
  return (
		<div>
			<Markdown>{text}</Markdown>
		</div>
	);
}
