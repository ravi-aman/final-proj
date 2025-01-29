"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useDrag, useDrop } from "react-dnd";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt, IconUser, IconStar, IconPlus, IconList } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ItemTypes = {
    LIST: "list",
    TAG: "tag"
};

function DraggableListItem({ index, list, moveList }: { index: number, list: string, moveList: (dragIndex: number, hoverIndex: number) => void }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.LIST,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.LIST,
        hover: (item: { index: number }) => {
            if (item.index !== index) {
                moveList(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="flex items-center justify-between bg-gray-100 dark:bg-neutral-700 rounded-lg p-2"
        >
            <div className="flex items-center gap-2">
                <IconList className="h-5 w-5" />
                <span className="text-sm text-gray-700 dark:text-gray-200">{list}</span>
            </div>
        </div>
    );
}

function DraggableTagItem({ index, tag, moveTag }: { index: number, tag: string, moveTag: (dragIndex: number, hoverIndex: number) => void }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TAG,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.TAG,
        hover: (item: { index: number }) => {
            if (item.index !== index) {
                moveTag(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-xs"
        >
            {tag}
        </div>
    );
}

export function SidebarDemo() {
    const [open, setOpen] = useState(false);
    const [lists, setLists] = useState(["Personal Tasks", "Work Tasks"]);
    const [tags, setTags] = useState(["#urgent", "#important"]);

    const moveList = (dragIndex: number, hoverIndex: number) => {
        const updatedLists = [...lists];
        const [movedList] = updatedLists.splice(dragIndex, 1);
        updatedLists.splice(hoverIndex, 0, movedList);
        setLists(updatedLists);
    };

    const moveTag = (dragIndex: number, hoverIndex: number) => {
        const updatedTags = [...tags];
        const [movedTag] = updatedTags.splice(dragIndex, 1);
        updatedTags.splice(hoverIndex, 0, movedTag);
        setTags(updatedTags);
    };

    const addList = () => {
        const newList = prompt("Enter list name:");
        if (newList) {
            setLists([...lists, newList]);
        }
    };

    const addTag = () => {
        const newTag = prompt("Enter tag:");
        if (newTag) {
            setTags([...tags, newTag]);
        }
    };

    return (
        <div className={cn("rounded-md flex flex-col md:flex-row dark:bg-neutral-800", "min-h-screen")}>
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            <SidebarLink
                                link={{
                                    label: "Dashboard",
                                    href: "#",
                                    icon: <IconBrandTabler className="h-5 w-5 flex-shrink-0" />,
                                }}
                            />
                            <SidebarLink
                                link={{
                                    label: "Profile",
                                    href: "#",
                                    icon: <IconUserBolt className="h-5 w-5 flex-shrink-0" />,
                                }}
                            />
                            <SidebarLink
                                link={{
                                    label: "Settings",
                                    href: "#",
                                    icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
                                }}
                            />
                            <SidebarLink
                                link={{
                                    label: "Logout",
                                    href: "#",
                                    icon: <IconArrowLeft className="h-5 w-5 flex-shrink-0" />,
                                }}
                            />
                        </div>
                    </div>

                    {/* Lists Section */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm text-gray-600 dark:text-gray-300">Lists</h4>
                            <button onClick={addList} className="text-sm text-blue-600 flex items-center gap-1">
                                <IconPlus className="h-4 w-4" />
                                Add List
                            </button>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            {lists.map((list, idx) => (
                                <DraggableListItem
                                    key={idx}
                                    index={idx}
                                    list={list}
                                    moveList={moveList}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm text-gray-600 dark:text-gray-300">Tags</h4>
                            <button onClick={addTag} className="text-sm text-blue-600 flex items-center gap-1">
                                <IconPlus className="h-4 w-4" />
                                Add Tag
                            </button>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {tags.map((tag, idx) => (
                                <DraggableTagItem
                                    key={idx}
                                    index={idx}
                                    tag={tag}
                                    moveTag={moveTag}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Favorites Section */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm text-gray-600 dark:text-gray-300">Favorites</h4>
                            <button className="text-sm text-yellow-600 flex items-center gap-1">
                                <IconStar className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="mt-8">
                        <SidebarLink
                            link={{
                                label: "Ravikant Tiwari",
                                href: "#",
                                icon: <IconUser className="h-7 w-7 flex-shrink-0 rounded-full" />,
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

export const Logo = () => (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
            To-Do App
        </motion.span>
    </Link>
);

export const LogoIcon = () => (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
);
