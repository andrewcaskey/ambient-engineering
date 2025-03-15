import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Extended schema with validation rules
const subscribeFormSchema = insertSubscriberSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to receive emails and accept the Privacy Policy",
  }),
});

type SubscribeFormValues = z.infer<typeof subscribeFormSchema>;

export const NewsletterSection = () => {
  const { toast } = useToast();
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      consent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SubscribeFormValues) => {
      // Remove consent as it's not part of the actual subscriber data model
      const { consent, ...subscriberData } = data;
      const response = await apiRequest("POST", "/api/subscribe", subscriberData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for joining our Dreamers Club!",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscribeFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="newsletter" className="py-16 bg-gradient-to-b from-[#0F1729] to-[#162447] relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533828550669-b0a804ffa14f?auto=format&fit=crop&w=1920&q=60')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold uppercase mb-4">
              Join <span className="text-[#009FB7]">AmbientLab</span> Community
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Subscribe to receive exclusive environments, scientific updates, and optimization tips
            </p>
            <div className="w-16 h-1 bg-[#009FB7] mx-auto"></div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="First Name" 
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          disabled={field.disabled}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#009FB7]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Last Name" 
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          disabled={field.disabled}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#009FB7]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Email Address" 
                        type="email" 
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        disabled={field.disabled}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#009FB7]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded text-[#009FB7] focus:ring-[#009FB7]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="ml-2 text-sm text-white/80">
                        I agree to receive emails and accept the <a href="/privacy" className="text-[#009FB7] hover:underline">Privacy Policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="bg-[#009FB7] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-[#008da3] hover:text-white transition-colors duration-300"
                >
                  {mutation.isPending ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
