/* eslint-disable react/prop-types */
import React from 'react';
import Markdown from 'react-markdown';

export default function Discr({ description }) {
	React.useEffect(() => {}, []);
	return (
		<div>
			<Markdown>{description}</Markdown>
		</div>
	);
}
