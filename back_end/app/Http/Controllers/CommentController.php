<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;
use App\Models\Book;
use Carbon\Carbon;

class CommentController extends Controller
{

    public function index(Request $request) {
        $book_id = $request->query('book_id');
        $comments = Comment::where('book_id', $book_id)->get();
        foreach ($comments as $comment) {
            $user = User::find($comment->user_id);
            $comment->user = $user;
        }
        return $comments;
    }

    public function store(Request $request)
    {
        try {
        $request->validate([
            'text' => 'required|max:200|string|min:1',
            'book_id' => 'required',
            'user_id' => 'required',
            'replied_id' => 'required'
        ]);

        $comment = new Comment();
        if ($request->replied_id == 0) {
            $comment->replied_id = null;
        } else {
            $replyExists = Comment::where('id', $request->replied_id)->exists();
            if (!$replyExists) {
                return response()->json(['message' => 'reply not found'], 404);
            }
            $comment->replied_id = $request->replied_id;
        }

        $userExists = User::where('id', $request->user_id)->exists();
        if (!$userExists) {
            return response()->json(['message' => 'user not found'], 404);
        }
        $comment->user_id = $request->user_id;

        $bookExists = Book::where('id', $request->book_id)->exists();
        if (!$bookExists) {
            return response()->json(['message' => 'book not found'], 404);
        }
        $comment->book_id = $request->book_id;

        $comment->text = $request->text;
        $comment->date = Carbon::now();
        $comment->save();

        return response()->json([
            'message' => 'comment created',
            'comment' => $comment
        ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
