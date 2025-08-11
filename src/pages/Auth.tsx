import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, Shield, GraduationCap } from "lucide-react";

export const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupProgress, setSignupProgress] = useState(20);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">IIM</span>
            </div>
            <span className="font-bold text-2xl text-foreground">Rohtak</span>
          </div>
          <p className="text-muted-foreground">
            Campus-exclusive marketplace for students and faculty
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Welcome Back</TabsTrigger>
            <TabsTrigger value="signup">Join Us</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin">
            <Card className="campus-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>
                  Access your IIM Rohtak marketplace account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email or Phone</Label>
                  <Input 
                    id="signin-email"
                    type="email" 
                    placeholder="your.email@iimrohtak.ac.in"
                    className="focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10 focus:border-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button className="w-full btn-campus">
                  SIGN IN
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-primary">
                    Forgot Password?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card className="campus-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Join Our Community</CardTitle>
                <CardDescription>
                  Create your IIM Rohtak marketplace account
                </CardDescription>
                <Progress value={signupProgress} className="mt-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <Input 
                      id="signup-email"
                      type="email" 
                      placeholder="@iimrohtak.ac.in"
                      className="focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone *</Label>
                    <Input 
                      id="signup-phone"
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className="focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-userid">User ID *</Label>
                  <Input 
                    id="signup-userid"
                    placeholder="Choose a unique username"
                    className="focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-hostel">Hostel/Department *</Label>
                    <Select>
                      <SelectTrigger className="focus:border-primary">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hostel1">Hostel 1</SelectItem>
                        <SelectItem value="hostel2">Hostel 2</SelectItem>
                        <SelectItem value="hostel3">Hostel 3</SelectItem>
                        <SelectItem value="hostel4">Hostel 4</SelectItem>
                        <SelectItem value="finance">Finance Department</SelectItem>
                        <SelectItem value="marketing">Marketing Department</SelectItem>
                        <SelectItem value="operations">Operations Department</SelectItem>
                        <SelectItem value="hr">HR Department</SelectItem>
                        <SelectItem value="it">IT Department</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-course">Course *</Label>
                    <Select>
                      <SelectTrigger className="focus:border-primary">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pgp">PGP</SelectItem>
                        <SelectItem value="ipm">IPM</SelectItem>
                        <SelectItem value="ipl">IPL</SelectItem>
                        <SelectItem value="dpm">DPM</SelectItem>
                        <SelectItem value="none">Faculty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password *</Label>
                  <div className="relative">
                    <Input 
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      className="pr-10 focus:border-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  <div className="text-sm">
                    <div className="font-medium">Campus Verification Required</div>
                    <div className="text-muted-foreground">Only @iimrohtak.ac.in emails accepted</div>
                  </div>
                </div>

                <Button className="w-full btn-campus">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  CREATE ACCOUNT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Note */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 inline mr-1" />
          Secure platform • Campus verified users only
        </div>
      </div>
    </div>
  );
};