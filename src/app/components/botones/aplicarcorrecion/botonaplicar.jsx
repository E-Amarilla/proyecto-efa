"use client";

import { Button } from "@nextui-org/react";

const BotonAplicar = ({ onClick }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Button
                style={{
                    backgroundColor: "#1F1F1F",
                    border: "1px solid #8C8C8C",
                    borderRadius: "20px",
                    color: "#D9D9D9",
                    marginLeft: "auto",
                    width: "20%",
                    height: "32px",
                    display: "flex",
                    fontWeight: "bold",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                }}
                onClick={onClick}
            >
                Apply
            </Button>
        </div>
    );
};

export default BotonAplicar;
