import { Request, Response, NextFunction } from 'express';

export const globalResponse = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log(err);
        res.status(err['cause'] || 500).json({
            message: 'Catch error',
            error_msg: err.message,
        });
    }
    next();
};
