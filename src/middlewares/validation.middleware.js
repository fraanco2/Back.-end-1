export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return res.status(400).json({
                mensaje: result.error.issues
                    .map((issue) => issue.message)
                    .join(", ")
            });
        }

        req[source] = result.data;

        next();
    };
};