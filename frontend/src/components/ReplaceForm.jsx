import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

function ReplaceData({ onReplaced, onError, }) {
    const url = import.meta.env.VITE_BASE_URL;

    const [loading, setLoading] = useState(false);

    const handleFinish = async (values) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("prompt", values.pattern);

        try {

            const res = await axios.post(`${url}api/replace-data/`, formData,
            );

            onReplaced?.(res.data?.data);
        } catch (err) {
            onError?.("Replacement failed. " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item
                label=""
                name="pattern"
                rules={[{ required: true, message: "Please enter a pattern!" }]}
            >
                <Input placeholder='e.g. "Find email addresses in the Email column and replace
them with REDACTED."' />
            </Form.Item>

            <div style={{ textAlign: "right" }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    Apply Replacement
                </Button>
            </div>
        </Form>
    );
}

export default ReplaceData;
