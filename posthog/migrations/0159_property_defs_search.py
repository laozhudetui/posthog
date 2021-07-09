# Generated by Django 3.1.12 on 2021-07-08 12:40

import warnings

from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.operations import TrigramExtension
from django.db import migrations


class TrigramExtensionSuppressExceptions(TrigramExtension):
    def database_forwards(self, app_label, schema_editor, from_state, to_state) -> None:
        try:
            return super().database_forwards(app_label, schema_editor, from_state, to_state)
        except BaseException as e:
            warnings.warn(
                """Could not install pg_trgm. Does your version of Postgres support it?
            Suppressed exception was: {}""".format(
                    e
                )
            )
            pass

    def database_backwards(self, app_label, schema_editor, from_state, to_state) -> None:
        try:
            return super().database_backwards(app_label, schema_editor, from_state, to_state)
        except BaseException as e:
            warnings.warn(
                """Could not uninstall pg_trgm. It may not be installed.
            Suppressed exception was: {}""".format(
                    e
                )
            )
            pass


class AddIndexSuppressExceptions(migrations.AddIndex):
    def database_forwards(self, app_label, schema_editor, from_state, to_state) -> None:
        try:
            return super().database_forwards(app_label, schema_editor, from_state, to_state)
        except BaseException as e:
            warnings.warn("Could not add index. Suppressed exception was: {}".format(e))
            pass

    def database_backwards(self, app_label, schema_editor, from_state, to_state) -> None:
        try:
            return super().database_backwards(app_label, schema_editor, from_state, to_state)
        except BaseException as e:
            warnings.warn("Could not remove index. Suppressed exception was: {}".format(e))
            pass


class Migration(migrations.Migration):

    dependencies = [
        ("posthog", "0158_new_token_format"),
    ]

    operations = [
        TrigramExtensionSuppressExceptions(),
        AddIndexSuppressExceptions(
            model_name="propertydefinition",
            index=GinIndex(fields=["name"], name="index_property_definition_name", opclasses=["gin_trgm_ops"]),
        ),
    ]
