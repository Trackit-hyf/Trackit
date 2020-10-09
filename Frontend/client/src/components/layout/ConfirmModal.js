import React from 'react';
import { Header, Button,  Modal, Icon } from 'semantic-ui-react';

export default function ConfirmModal(props) {
	return (
		<Modal
			basic
			onClose={() => props.onClose(false)}
			onOpen={() => props.onClose(true)}
			open={props.show}
			size="small"
		>
			<Header icon>
				<Icon name="archive" />
				Are you sure? 
			</Header>
			<Modal.Content>
				<p>{props.message}</p>
			</Modal.Content>
			<Modal.Actions>
				<Button basic color="red" inverted onClick={() => props.onClose(false)}>
					<Icon name="remove" /> No
				</Button>
				<Button color="green" inverted onClick={() => {props.onClose(false) ;props.confirm(true)}}>
					<Icon name="checkmark" /> Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
}
