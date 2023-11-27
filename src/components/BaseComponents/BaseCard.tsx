import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'

type BaseCardProps = {
    title: string
    description?: string
    content: React.ReactNode
    footer?: React.ReactNode
}

export default function BaseCard({
    title,
    description,
    content,
    footer,
}: BaseCardProps) {
    const renderDescription = () => {
        if (description) {
            return <CardDescription>{description}</CardDescription>
        }
        return null
    }

    const renderFooter = () => {
        if (footer) {
            return <CardFooter className="p-2.5">{footer}</CardFooter>
        }
        return null
    }

    return (
        <Card className="p-0">
            <CardHeader className="p-6">
                <CardTitle>{title}</CardTitle>
                {renderDescription()}
            </CardHeader>
            <CardContent className="p-2.5">{content}</CardContent>
            {renderFooter()}
        </Card>
    )
}
