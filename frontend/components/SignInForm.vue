<style scoped src="../assets/css/style.css"></style>

<template>

    <div v-html="alertBox">
    </div>

    <div class="flex flex-col p-2 group-signin-form">
        <h1 class="signin-text ml-4">
            Sign In to WisdomCircle
        </h1>
        <h2 class="create-acc-suggestion-text mb-4 ml-4">
            Don’t have an account? <NuxtLink to="/" class="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</NuxtLink>
        </h2>

        <Form @submit = "onSubmit">
            <Field name="email" type="email" :rules="validateEmail"  placeholder="Email or Mobile Number" class="ml-4 mt-4 mr-4" required/>
            <ErrorMessage name="email" class="ml-4 text-red-600 text-sm" />

            <div class="mt-4 ml-4 mr-4 grid flex relative z-0 items-center">
                <Field name="password" :type="fieldType" :rules="validatePassword" placeholder="Password" class="peer ..."/>
                <button @click="toggleShow" class="w-fit ml-auto p-m absolute inset-0 flex justify-end items-center m-4">
                    <div>
                        <img v-if="isEyeOpen" src="../assets/images/eye.svg" alt="eye" />
                        <img v-else src="../assets/images/eye-closed.svg" alt="eye" />
                    </div>
                </button>                    
            </div>
            <ErrorMessage name="password" class="ml-4 text-red-600 text-sm" />

            
            <div class="flow-root font-medium mt-2 mr-4 mb-4 ml-4">
                <NuxtLink to="/" class="float-right text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</NuxtLink>
            </div>

            <input type="submit" class="button m-4 mt-8" value="Sign in"/>
        </Form>
    </div>
</template>


<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import axios from 'axios';

    const baseUrl = 'https://wisgen-api.onrender.com';

    export default {

        components: {
            Form,
            Field,
            ErrorMessage,
        },

        data() {
            return {
                isEyeOpen: false,
                fieldType: 'password',
                alertBox: '<div></div>',
            };
        },

        props: {
            type: { type: String, default: "password" },
        },

        mounted() {
            this.fieldType = this.type;
        },

        watch:{
            type(val){
                this.fieldType = val;
            }
        },

        /* computed: {
            changeEyeIcon () {
                return (this.icon == "eye-closed") ? "../assets/images/eye-closed.svg" : "../assets/images/eye.svg";
            }
        } , 
        */

        methods: {
            toggleShow() {

                /* if (this.icon === "eye-closed") {
                    this.icon = "eye";
                } else this.icon = "eye-closed";

                */

                this.isEyeOpen = !this.isEyeOpen;


                //For Simplification => this.fieldType = this.fieldType == "text" ? "password" : "text"
                if (this.fieldType == "password") {
                    this.fieldType = "text";
                } else this.fieldType = "password";
            

            },

            onSubmit (values) {
                const email = values.email;
                const password = values.password;

                // Make API calls for Authentication

                const loginEndPoint = baseUrl + '/login';

                axios.post(loginEndPoint, {
                    email: email,
                    password: password
                })
                .then(
                    (response) => {
                        const authMessage = response.data.message;
                        const isLoggedIn = response.data.isLoggedIn;

                        if(isLoggedIn) {
                            this.alertBox = `<div class="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
                                                <strong class="font-bold">${authMessage}</strong>
                                            </div>`;
                        } else {
                            this.alertBox = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                                <strong class="font-bold">${authMessage}</strong>
                                            </div>`;
                        }

                        setTimeout(() => {this.alertBox = null}, 2000);
                    },

                    (error) => {
                        alert(error);
                    }
                )
                
                .catch(
                    error => {
                        alert(error);
                    }
                );
            },

            validateEmail(value) {
                if (!value) {
                    return 'This field is required';
                }

                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

                //const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
                if (!regex.test(value)) {
                    return 'This field must be a valid email';
                }
                // All is good
                return true;
            },

            validatePassword (value) {
                if (!value) {
                    return 'This field is required';
                }

                return true;
            }

        }
    };
</script>
