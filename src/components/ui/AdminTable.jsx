import React, { useState, useEffect, useMemo } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from './table';
import { Button } from './Button';
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { deleteCategory, deleteUser, deleteProduct } from '../../service/api';
import { toast } from 'sonner';
import { useThemeStore } from '@/store/useThemeStore';
const AdminTable = ({ tabName = 'products', data = [], itemsPerPage = 10 }) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dataparm = data || [];
    const theme = useThemeStore(state => state.theme);
    const totalPages = Math.max(1, Math.ceil(dataparm.length / itemsPerPage));

    useEffect(() => {
        setPage(1);
    }, [tabName, dataparm]);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [dataparm]);

    const currentData = useMemo(() => {
        return dataparm.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }, [dataparm, page, itemsPerPage]);

    const columns = Object.keys(currentData?.[0] || {});

    const renderCell = value => {
        if (typeof value === 'object') return '—';

        if (typeof value === 'string' && value.startsWith('http')) {
            return (
                <img
                    src={value}
                    alt=""
                    className="w-10 h-10 object-cover rounded"
                />
            );
        }

        if (typeof value === 'string' && value.length > 25) {
            return value.substring(0, 25) + '...';
        }

        return value;
    };
    const deleteData = async id => {
        if (tabName === 'products') {
            await deleteProduct(id);
            toast.success('product deleted succsefuly', {
                style: {
                    background: '#16a34a',
                    color: 'white',
                },
            });
        } else if (tabName === 'categories') {
            await deleteCategory(id);
            toast.success('Category deleted succsefuly', {
                style: {
                    background: '#16a34a',
                    color: 'white',
                },
            });
        } else {
            await deleteUser(id);
            toast.success('User deleted succsefuly', {
                style: {
                    background: '#16a34a',
                    color: 'white',
                },
            });
        }
    };

    return (
        <div
            className={`w-full max-w-full overflow-x-auto ${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
        >
            {/* Table wrapper */}
            <div
                className={`w-full  shadow-sm overflow-hidden ${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
            >
                <div
                    className={`overflow-x-auto ${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
                >
                    <Table
                        className={`max-w-125 table-auto ${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
                    >
                        <TableHeader
                            className={`${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
                        >
                            <TableRow className="bg-slate-50">
                                {columns.map(key => (
                                    <TableHead key={key}>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                    </TableHead>
                                ))}

                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading
                                ? [...Array(itemsPerPage)].map((_, i) => (
                                      <TableRow
                                          key={i}
                                          className="animate-pulse"
                                      >
                                          {[...Array(columns.length + 1)].map(
                                              (_, j) => (
                                                  <TableCell
                                                      className={
                                                          'max-w-50 truncate'
                                                      }
                                                      key={j}
                                                  >
                                                      <div className="h-4 w-full  rounded"></div>
                                                  </TableCell>
                                              )
                                          )}
                                      </TableRow>
                                  ))
                                : currentData.map((item, i) => (
                                      <TableRow
                                          key={item.id || i}
                                          className="hover:bg-[#333]"
                                      >
                                          {columns.map((key, colIndex) => (
                                              <TableCell
                                                  className={`max-w-50 truncate ${colIndex === 1 ? 'cursor-pointer hover:text-amber-500' : ''}`}
                                                  onClick={
                                                      colIndex === 1
                                                          ? () => {
                                                                navigate(
                                                                    `/${tabName}/${item.id}`
                                                                );
                                                            }
                                                          : undefined
                                                  }
                                                  key={key}
                                              >
                                                  {renderCell(item[key])}
                                              </TableCell>
                                          ))}

                                          {/* actions */}

                                          <TableCell className="flex gap-2 justify-end">
                                              <Edit
                                                  size={16}
                                                  className="cursor-pointer"
                                                  onClick={() =>
                                                      navigate(
                                                          `/${tabName}/${item.id}`
                                                      )
                                                  }
                                              />

                                              <Trash2
                                                  size={16}
                                                  color="red"
                                                  className="cursor-pointer"
                                                  onClick={() =>
                                                      deleteData(item.id)
                                                  }
                                              />
                                          </TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}

            {!loading && (
                <div
                    className={`flex justify-end items-center gap-2 m-4 ${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
                >
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className={`${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
                    >
                        <ChevronLeft size={16} />
                    </Button>

                    <span
                        className={`text-sm  ${theme === 'dark' ? 'bg-[#333] text-[#fff]' : 'bg-[#fff] text-[#000]'}`}
                    >
                        Page {page} of {totalPages}
                    </span>

                    <Button
                        size="sm"
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AdminTable;
