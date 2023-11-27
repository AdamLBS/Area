import React from 'react'
import EventCard from '@/components/EventCard'
import AllEventsCard from '@/components/AllEventsCard'

export default function Home() {
    return (
        <div class="flex space-x-2.5">
            <AllEventsCard />
            <EventCard />
        </div>
    )
}
