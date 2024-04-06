import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'SHINE ON! Admin';
const APP_DEFAULT_TITLE = 'Admin Console';
const APP_TITLE_TEMPLATE = '%s - Admin';
const APP_DESCRIPTION = 'SHINE ON! Admin Console - Manage your SHINE ON! account and settings here';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION,
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE
        },
        description: APP_DESCRIPTION
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE
        },
        description: APP_DESCRIPTION
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
