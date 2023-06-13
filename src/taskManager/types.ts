import { HttpError as Error } from "../utils/httpError";

export type BasicResult<T> = { data: T };

/**
 * Тип, используемый строго при присваивании другому типу,
 * который явно указывает, что последний не является результатом с ошибкой
 */
export type NotErrorStatus = { error?: never };

export type Never<T> = { [K in keyof T]?: never };

export type ExecutionResult<T> = (BasicResult<T> & NotErrorStatus) | ErrorResult;;

/**
 * Тип, определяющий все поля как недоступные,
 * кроме поля с ошибкой - error
 */
export type ErrorResult = { 
    error: Error,
}



