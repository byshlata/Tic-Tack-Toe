import React, { ReactElement } from 'react';

import { Button, Form, Input } from 'antd';

import style from './InputWithButton.module.sass';

type InputWithButtonType = {
  isLoading: boolean;
  onChange: (changedValues: any, values: any) => void;
  labelInput: string;
  labelButton: string;
  onClick: () => Promise<void>;
};

export const InputWithButton = ({
  labelInput,
  labelButton,
  onClick,
  isLoading,
  onChange,
}: InputWithButtonType): ReactElement => {
  const onFinish = (): void => {
    onClick();
  };

  return (
    <div className={style.container}>
      <Form
        layout="inline"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={onChange}
      >
        <Form.Item
          label={labelInput}
          name="value"
          rules={[{ required: true, message: `Please input ${labelInput}` }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {labelButton}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
