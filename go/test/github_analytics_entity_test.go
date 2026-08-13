package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go"
	"github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go/core"

	vs "github.com/voxgig-sdk/catherine-shulmans-quotes-sdk/go/utility/struct"
)

func TestGithubAnalyticsEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GithubAnalytics(nil)
		if ent == nil {
			t.Fatal("expected non-nil GithubAnalyticsEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := github_analyticsBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "github_analytics." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_ANALYTICS_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		githubAnalyticsRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.github_analytics", setup.data)))
		var githubAnalyticsRef01Data map[string]any
		if len(githubAnalyticsRef01DataRaw) > 0 {
			githubAnalyticsRef01Data = core.ToMapAny(githubAnalyticsRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = githubAnalyticsRef01Data

		// LOAD
		githubAnalyticsRef01Ent := client.GithubAnalytics(nil)
		githubAnalyticsRef01MatchDt0 := map[string]any{}
		githubAnalyticsRef01DataDt0Loaded, err := githubAnalyticsRef01Ent.Load(githubAnalyticsRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if githubAnalyticsRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func github_analyticsBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "github_analytics", "GithubAnalyticsTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read github_analytics test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse github_analytics test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"github_analytics01", "github_analytics02", "github_analytics03", "github01", "github02", "github03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_ANALYTICS_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_ANALYTICS_ENTID": idmap,
		"CATHERINE_SHULMANS_QUOTES_TEST_LIVE":      "FALSE",
		"CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["CATHERINE_SHULMANS_QUOTES_TEST_GITHUB_ANALYTICS_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CATHERINE_SHULMANS_QUOTES_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewCatherineShulmansQuotesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CATHERINE_SHULMANS_QUOTES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CATHERINE_SHULMANS_QUOTES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
