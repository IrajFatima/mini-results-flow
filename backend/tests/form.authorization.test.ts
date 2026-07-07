import { authorize } from "../middleware/authorize";

describe("authorize middleware", () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    describe("Admin routes", () => {
        it("should allow an admin to access admin routes", () => {
            req.user = {
                id: "admin-1",
                role: "admin",
            };

            authorize("admin")(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it("should deny a user from accessing admin routes", () => {
            req.user = {
                id: "user-1",
                role: "user",
            };

            authorize("admin")(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message:
                    "You are not authorized to access this resource.",
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("User routes", () => {
        it("should allow a user to access user routes", () => {
            req.user = {
                id: "user-1",
                role: "user",
            };

            authorize("user")(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it("should deny an admin from accessing user routes", () => {
            req.user = {
                id: "admin-1",
                role: "admin",
            };

            authorize("user")(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message:
                    "You are not authorized to access this resource.",
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    it("should return 401 when no authenticated user exists", () => {
        req.user = undefined;

        authorize("admin")(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Authentication required.",
        });

        expect(next).not.toHaveBeenCalled();
    });
});