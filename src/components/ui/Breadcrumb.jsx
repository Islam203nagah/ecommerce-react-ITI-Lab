import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function Breadcrumb({ items }) {
    return (
        <nav className="text-sm breadcrumbs mb-4 px-3">
            <ol className="flex items-center gap-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                        {item.to ? (
                            <Link
                                to={item.to}
                                className="text-blue-600 hover:underline"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold">{item.label}</span>
                        )}
                        {idx < items.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
