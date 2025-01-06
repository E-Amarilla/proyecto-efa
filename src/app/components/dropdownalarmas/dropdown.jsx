"use client";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button,
    cn,
  } from "@nextui-org/react";
  
  export default function App() {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Open Menu</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
          <DropdownSection showDivider title="Actions">
            <DropdownItem
              key="new"
              description="Create a new file"
              shortcut="⌘N"
            >
              New file
            </DropdownItem>
            <DropdownItem
              key="copy"
              description="Copy the file link"
              shortcut="⌘C"
            >
              Copy link
            </DropdownItem>
            <DropdownItem
              key="edit"
              description="Allows you to edit the file"
              shortcut="⌘⇧E"
            >
              Edit file
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              description="Permanently delete the file"
              shortcut="⌘⇧D"
            >
              Delete file
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  }