<?php

namespace App\Http\Controllers;

use App\Enums\RoleUserEnum;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\EditUserRequest;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // check if the user is an admin
         /** @var User $user */
         $user = $request->user();
        if ($user->role !== RoleUserEnum::ROLE_ADMIN->name) {
            // redirect to the home page
            return redirect(route(name: 'dashboard', absolute: false));
        } 
        $users = User::all();
        return Inertia::render('User/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        if ($user->role !== RoleUserEnum::ROLE_ADMIN->name) {
            // redirect to the home page
            return redirect(route(name: 'dashboard', absolute: false));
        } 

        $roles = RoleUserEnum::getNames();
        return Inertia::render('User/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        $request->validated();
        $authenticatedUser = $request->user();
        if ($authenticatedUser->role !== RoleUserEnum::ROLE_ADMIN->name) {
            // redirect to the home page
            return redirect(route(name: 'dashboard', absolute: false));
        } 
         $newUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]); 
        return redirect(route(name: 'users.index', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, User $user)
    {
        /** @var User $authenticatedUser */
        $authenticatedUser = $request->user();
        if ($authenticatedUser->role !== RoleUserEnum::ROLE_ADMIN->name) {
            // redirect to the home page
            return redirect(route(name: 'dashboard', absolute: false));
        } 

        $roles = RoleUserEnum::getNames();
        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => $roles,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditUserRequest $request, User $user)
    {
        $request->validated();
        
        $user->update($request->all());
        return redirect(route(name: 'users.index', absolute: false));
    }

    function sendResetPasswordEmail(User $user)
    {
        dd($user);
    }

    function resetPassword(User $user)
    {
        return Inertia::render('User/ResetPassword', [
            'user' => $user,
        ]);
    }

    function resetPasswordRequest(User $user)
    {
        dd($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
