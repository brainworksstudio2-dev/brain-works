
"use client";

import { useEffect, useState } from 'react';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/client';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader } from 'lucide-react';
import { notFound } from 'next/navigation';

type InvoiceItem = {
    description: string;
    quantity: number;
    price: number;
    amount: number;
};

type InvoiceData = {
    invoiceNumber: string;
    date: Timestamp;
    invoiceTo: string;
    clientEmail: string;
    paymentMethod: string;
    status: 'Paid' | 'Pending' | 'Late';
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    taxAmount: number;
    total: number;
    notes?: string;
};

export default function InvoicePage({ params }: { params: { id: string } }) {
    const [invoice, setInvoice] = useState<InvoiceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!params.id) return;

        const fetchInvoice = async () => {
            try {
                const docRef = doc(db, 'invoices', params.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as InvoiceData;
                    // Pre-calculate amount for each item
                    data.items = data.items.map(item => ({...item, amount: item.quantity * item.price}));
                    setInvoice(data);
                } else {
                    setError('Invoice not found.');
                    notFound();
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch invoice.');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center text-destructive">
                {error}
            </div>
        );
    }
    
    if (!invoice) {
        return notFound();
    }
    
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Paid':
                return 'text-green-600 bg-green-100';
            case 'Pending':
                return 'text-orange-600 bg-orange-100';
            case 'Late':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    }


    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <div className="p-8 sm:p-12">
                    <header className="flex justify-between items-start mb-12">
                        <div>
                            <Logo />
                            <p className="text-muted-foreground mt-2">brainworksstudio2@gmail.com</p>
                            <p className="text-muted-foreground">024 240 3450 / 053 112 5952</p>
                            <p className="text-muted-foreground">Amasaman, Ghana</p>
                        </div>
                        <div className="text-right">
                            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">INVOICE</h1>
                            <p className="text-muted-foreground mt-2">Invoice No: {invoice.invoiceNumber}</p>
                            <p className="text-muted-foreground">Invoice Date: {invoice.date.toDate().toLocaleDateString()}</p>
                        </div>
                    </header>

                    <Separator className="my-8" />

                    <section className="grid md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Invoice To</h2>
                            <p className="font-bold">{invoice.invoiceTo}</p>
                            <p className="text-muted-foreground">{invoice.clientEmail}</p>
                        </div>
                        <div className="text-right md:text-right">
                             <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment Details</h2>
                             <p className="text-muted-foreground">Method: {invoice.paymentMethod}</p>
                             <div className="mt-2">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(invoice.status)}`}>
                                    {invoice.status}
                                </span>
                             </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="w-[50%]">Description</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoice.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.description}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </section>

                    <section className="flex justify-end mb-12">
                        <div className="w-full max-w-sm space-y-4">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p className="font-medium">${invoice.subtotal.toFixed(2)}</p>
                            </div>
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Tax ({invoice.tax}%)</p>
                                <p className="font-medium">${invoice.taxAmount.toFixed(2)}</p>
                            </div>
                            <Separator />
                             <div className="flex justify-between text-2xl font-bold">
                                <p>Total</p>
                                <p>${invoice.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </section>
                    
                    {invoice.notes && (
                         <section>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Terms & Conditions</h3>
                            <p className="text-muted-foreground text-sm">{invoice.notes}</p>
                        </section>
                    )}

                </div>
                 <footer className="bg-gray-100 text-center px-8 py-4 border-t">
                    <p className="text-muted-foreground text-sm">Thank you for your business!</p>
                </footer>
            </div>
        </div>
    );
}

