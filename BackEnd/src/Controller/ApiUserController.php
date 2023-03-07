<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;




class ApiUserController extends AbstractController
{
    #[Route('/list', name: 'list')]
    public function index(): Response
    {
        return $this->json([
            'message' => 'this is list'
        ]);
    }

    #[Route('/listUsers', name: 'listUsers', methods: ['GET'])]

    public function listusers(ManagerRegistry $doctrine): Response
    {
        $users = $doctrine
            ->getRepository(User::class)
            ->findAll();

        $data = [];

        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'role' => $user->getRoles(),
            ];
        }


        return $this->json($data);
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $jwtManager)
    {
        $post_data = json_decode($request->getContent(), true);
        // create a new user object
        $user = new User();

        // get the form data from the request
        $email = $post_data['email'];
        $role = $post_data['roles'];
        $password = $post_data['password'];
        // validate the form data
        if (!$email || !$role || !$password) {
            return new JsonResponse(['error' => 'Email, role, and password are required'], 400);
        }

        // set the user object properties
        $user->setEmail($email);
        $user->setRoles([$role]);

        // hash the password and set it on the user object
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        // save the user to the database
        $entityManager = $doctrine->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        // generate a JWT token for the user
        $token = $jwtManager->create($user);

        // return a JSON response with the token
        return new JsonResponse(['token' => $token], 201);
    }

    #[Route('/DeleteUser/{id}', name: 'DeleteUser', methods: "DELETE")]
    public function deleteReservation(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json('No user found for id' . $id, 404);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return $this->json('Deleted a user successfully with id ' . $id);
    }
}
