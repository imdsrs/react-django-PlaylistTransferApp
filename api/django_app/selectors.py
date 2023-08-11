from .models import BaseUser
from django.db.models.query import QuerySet
from .filters import BaseUserFilter

def user_list(*, filters=None) -> QuerySet[BaseUser]:
    filters = filters or {}

    qs = BaseUser.objects.all()

    return BaseUserFilter(filters, qs).qs
