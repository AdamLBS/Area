import React from 'react'
import BaseCard from '@/components/BaseComponents/BaseCard'

export default function EventCard() {
    const cardContent = <p>This is the dynamic content of the card.</p>

    return (
        <BaseCard
            title="Your events"
            description="All of your events you have already created"
            content={cardContent}
        />
    )
}
