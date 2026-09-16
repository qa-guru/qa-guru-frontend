export type GraphqlErrorItem = {
  message?: string;
  extensions?: Record<string, unknown> | null;
};

export type GraphqlLikeError = {
  message?: string;
  graphQLErrors?: ReadonlyArray<GraphqlErrorItem | null> | null;
};

function graphQlItems(
  error?: GraphqlLikeError | null
): GraphqlErrorItem[] {
  return (error?.graphQLErrors ?? []).filter(
    (item): item is GraphqlErrorItem => item != null
  );
}

function classificationOf(item: GraphqlErrorItem): string {
  const extensions = item.extensions ?? {};
  const value = extensions.classification ?? extensions.errorType;

  return typeof value === "string" ? value.toUpperCase() : "";
}

export function isGraphqlNotFound(
  error?: GraphqlLikeError | null
): boolean {
  if (!error) {
    return false;
  }

  const items = graphQlItems(error);

  if (items.some((item) => classificationOf(item) === "NOT_FOUND")) {
    return true;
  }

  const chunks = [error.message, ...items.map((item) => item.message)];

  return chunks.some((message) => /not found/i.test(message ?? ""));
}
