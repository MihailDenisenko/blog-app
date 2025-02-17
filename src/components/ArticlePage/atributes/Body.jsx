/* eslint-disable react/prop-types */
import React from 'react';
import Markdown from 'react-markdown';

export default function Body({ text }) {
	React.useEffect(() => {}, []);

	return (
		<div>
			<Markdown>{text}</Markdown>
		</div>
	);
}
