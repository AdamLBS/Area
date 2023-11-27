import React from 'react'
import BaseCard from '@/components/BaseComponents/BaseCard'

export default function EventCard() {
    return (
        <BaseCard
            title="Your events"
            description="All of your events you have already created"
            content={<p>This is the dynamic content of the card.</p>}
        />
    )
}
