import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Navigate } from "react-router-dom";

const RegisterForm = () => {
  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to register
        </CardDescription>

        <form>
          <CardContent className="space-y-4 pt-0">
            {/* {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{error}</div>
            )} */}

            {/* Name */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Full Name</div>
              <Input
                name="name"
                placeholder="John Doe"
                required
                // value={formValues.name}
                // onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Email</div>
              <Input
                name="email"
                placeholder="email@email.com"
                required
                // value={formValues.email}
                // onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Password</div>
              <Input
                name="password"
                type="password"
                placeholder="*****"
                required
                // value={formValues.password}
                // onChange={handleInputChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">
                Confirm Password
              </div>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="*****"
                required
                // value={formValues.confirmPassword}
                // onChange={handleInputChange}
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Role</div>
              <select
                name="role"
                // value={formValues.role} // ✅ proper binding
                // onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <div className="py-4">
              <Button type="submit" className="w-full cursor-pointer">
                {/* {registerMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle /> Creating account...
                  </span>
                ) : (
                  'Create Account'
                )} */}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center pt-0">
            <div className="text-center text-sm">
              Already have an account?{" "}
              {/* <a onClick={() => navigate('/login')} className="text-primary hover:underline cursor-pointer">
                Sign in
              </a> */}
            </div>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
};

export default RegisterForm;
