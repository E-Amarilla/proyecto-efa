"use client";

import { Button } from "@nextui-org/react";

const BotonResetear = ({ onClick }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Button
                style={{
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    boxShadow: "0 4px 6px rgba(255, 255, 255, 0.1)", // Sombra blanca con opacidad
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
                Reset
            </Button>
        </div>
    );
};

export default BotonResetear;
