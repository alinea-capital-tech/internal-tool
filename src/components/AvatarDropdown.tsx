"use client";

import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import { Icon } from "./Icon";

const AvatarDropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const Content = ({
    onClick,
  }: {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  }) => {
    return <div onClick={onClick}>{children}</div>;
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const closeOnInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      content={<Content onClick={closeOnInsideClick} />}
      onOpenChange={handleOpenChange}
      placement="bottomLeft"
      arrow={false}
      trigger={["click"]}
      destroyTooltipOnHide
      styles={{
        body: {
          padding: "1rem",
        },
      }}
    >
      <Button
        type="text"
        style={{
          padding: "8px",
        }}
        size="large"
      >
        <div className="flex gap-2">
          <Avatar icon={<UserOutlined />} />
          <Icon className="w-6 h-6" name="chevron" />
        </div>
      </Button>
    </Popover>
  );
};

export default AvatarDropdown;
