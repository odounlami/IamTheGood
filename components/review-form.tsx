"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { RatingStampInput } from "@/components/rating-stamp-input"
import { createReview, getStoredUser } from "@/lib/api"

export function ReviewForm({ sellerName, targetId }: { sellerName: string; targetId: string }) {
  const [rating, setRating] = useState(0); const [comment, setComment] = useState(""); const [submitted, setSubmitted] = useState(false); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState("")
  if (submitted) return <div className="flex items-start gap-4 border-2 border-accent p-5 mix-blend-multiply"><span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent"><Check className="size-4" /></span><div className="flex flex-col gap-0.5"><p className="font-serif text-base font-semibold text-accent">Avis publié</p><p className="text-sm text-foreground/80">Merci d&apos;avoir donné votre avis sur {sellerName}. Il apparaîtra désormais sur son profil.</p></div></div>
  if (!getStoredUser()) return <div className="flex flex-col gap-3"><p className="text-sm text-muted-foreground">Connectez-vous pour laisser un avis.</p><Button render={<a href="/login" />} nativeButton={false} variant="outline">Se connecter</Button></div>
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (rating === 0) return; setSubmitting(true); setError(""); try { await createReview({ targetId, rating, comment: comment.trim() || undefined }); setSubmitted(true) } catch (err) { setError(err instanceof Error ? err.message : "Impossible de publier l'avis.") } finally { setSubmitting(false) } }
  return <form className="flex flex-col gap-5" onSubmit={handleSubmit}><FieldGroup><Field><FieldLabel>Votre note</FieldLabel><RatingStampInput value={rating} onChange={setRating} /></Field><Field><FieldLabel htmlFor="reviewer-comment">Votre commentaire (facultatif)</FieldLabel><Textarea id="reviewer-comment" placeholder="Décrivez votre expérience d'achat ou de vente…" value={comment} onChange={(event) => setComment(event.target.value)} rows={3} /></Field></FieldGroup>{error && <p className="text-sm text-destructive">{error}</p>}<Button type="submit" disabled={rating === 0 || submitting} className="self-start">{submitting ? "Publication…" : "Publier mon avis"}</Button></form>
}
