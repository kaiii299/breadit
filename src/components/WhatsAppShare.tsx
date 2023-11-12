import React from 'react';
import { WhatsappShareButton } from 'react-share';
import { Button } from './ui/Button';
import { Send } from 'lucide-react';

type props = {
    message: string
}

const WhatsAppShare = ({ message }: props) => {
    const shareUrl = `${message}`;

    return (
        <WhatsappShareButton url={shareUrl}>
            <Button type="submit">
                Share
                <Send className='h-4 w-4 ml-2' />
            </Button>
        </WhatsappShareButton>
    );
};

export default WhatsAppShare;