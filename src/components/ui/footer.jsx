import { Github, Facebook, Twitter } from 'lucide-react';
import { Separator } from './separator';
import { useThemeStore } from '@/store/useThemeStore';

export default function Footer() {
    const theme = useThemeStore(state => state.theme);
    return (
        <footer
            className="w-full border-t bg-background"
            style={
                theme === 'light'
                    ? { backgroundColor: '#fff', color: '#000' }
                    : { backgroundColor: '#333', color: '#fff' }
            }
        >
            <div className="container mx-auto px-6 py-10">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Logo / About */}
                    <div>
                        <h2 className="text-xl font-bold">MyWebsite</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                            Build modern web apps using React and shadcn/ui
                            components.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="hover:text-foreground cursor-pointer">
                                Home
                            </li>
                            <li className="hover:text-foreground cursor-pointer">
                                Products
                            </li>
                            <li className="hover:text-foreground cursor-pointer">
                                About
                            </li>
                            <li className="hover:text-foreground cursor-pointer">
                                Contact
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-3">Follow Us</h3>

                        <div className="flex gap-4 text-muted-foreground">
                            <Github className="cursor-pointer hover:text-foreground" />
                            <Facebook className="cursor-pointer hover:text-foreground" />
                            <Twitter className="cursor-pointer hover:text-foreground" />
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                <p className="text-center text-sm text-muted-foreground">
                    © 2026 MyWebsite. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
