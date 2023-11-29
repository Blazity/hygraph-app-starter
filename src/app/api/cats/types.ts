import { Config } from '@/hooks/useAppConfig/useAppConfig';

export type RequestBody = {
  configuration: Config;
};

export type ErrorData = {
  message: string;
  statusCode: number;
};
