import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate required fields (email is optional)
        if (!body.name || !body.phone || !body.message) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: name, phone, or message' },
                { status: 400 }
            )
        }

        // Google Apps Script deployment URL
        // Replace this with your actual Google Apps Script URL
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbyXoQrk-QeXwRi8DTaNzMs6lf66m7k_22qB9ntzjUO4LisYUi7RyasDV_RQVr414bkN/exec'

        // Prepare data for Google Sheets
        const submissionData = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            services: body.services,
            message: body.message,
            timestamp: new Date().toISOString(),
            language: body.language
        }

        // Send to Google Sheets via Google Apps Script
        console.log('Sending data to Google Apps Script:', JSON.stringify(submissionData))

        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
            redirect: 'follow'
        })

        console.log('Google Apps Script response status:', response.status, response.statusText)

        // Handle response - Google Apps Script may return 200 even on errors
        let result
        try {
            const responseText = await response.text()
            console.log('Google Apps Script raw response:', responseText)

            // Try to parse as JSON
            try {
                result = JSON.parse(responseText)
                console.log('Parsed JSON result:', result)
            } catch (parseError) {
                // If response is not JSON, it might be HTML or plain text
                console.warn('Response is not valid JSON:', parseError)
                // If we get a 200 status, assume success even without JSON
                if (response.ok) {
                    console.log('Non-JSON response but status is OK, assuming success')
                    return NextResponse.json(
                        { success: true, message: 'Form submitted successfully' },
                        { status: 200 }
                    )
                } else {
                    throw new Error(`Invalid response format: ${responseText.substring(0, 100)}`)
                }
            }
        } catch (fetchError) {
            console.error('Error fetching or parsing response:', fetchError)
            throw new Error(`Failed to get response from Google Sheets: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`)
        }

        // Google Apps Script returns { result: 'success' } or { result: 'error' }
        if (result.result === 'success') {
            console.log('Submission successful, data saved to Google Sheets')
            return NextResponse.json(
                { success: true, message: 'Form submitted successfully' },
                { status: 200 }
            )
        } else if (result.result === 'error') {
            console.error('Google Apps Script returned error:', result.error)
            throw new Error(result.error || 'Submission failed on server')
        } else {
            // Unexpected response format
            console.warn('Unexpected response format:', result)
            // If response was OK, assume success
            if (response.ok) {
                return NextResponse.json(
                    { success: true, message: 'Form submitted successfully' },
                    { status: 200 }
                )
            } else {
                throw new Error('Unexpected response format from Google Sheets')
            }
        }

    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error'
            },
            { status: 500 }
        )
    }
}

// Optional: Handle GET requests for testing
export async function GET() {
    return NextResponse.json(
        { message: 'Contact form API endpoint is working' },
        { status: 200 }
    )
}